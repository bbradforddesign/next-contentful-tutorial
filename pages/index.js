import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {
    // configure credentials
    const client = createClient({
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        space: process.env.CONTENTFUL_SPACE_ID,
    });

    // retrieve by content type
    const res = await client.getEntries({ content_type: "recipe" });

    // pass data to component to render
    return {
        props: {
            recipes: res.items,
        },
    };
}

export default function Recipes({ recipes }) {
    console.log(recipes);
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} />
            ))}
        </div>
    );
}
