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
        revalidate: 1,
    };
}

export default function Recipes({ recipes }) {
    console.log(recipes);
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} />
            ))}

            <style jsx>{`
                .recipe-list {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: 20px 60px;
                }
            `}</style>
        </div>
    );
}
