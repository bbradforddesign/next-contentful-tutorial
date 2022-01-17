import { createClient } from "contentful";

const client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
});

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: "recipe",
    });

    // get all path slugs from contentful, structure for Nextjs
    const paths = res.items.map((item) => {
        return {
            params: { slug: item.fields.slug },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

// get single item based on path. called once per item
// injects props into component
export async function getStaticProps({ params }) {
    // always returns array, even if single item
    const { items } = await client.getEntries({
        content_type: "recipe",
        "fields.slug": params.slug, // get item by slug
    });

    return {
        props: { recipe: items[0] },
    };
}

export default function RecipeDetails({ recipe }) {
    console.log(recipe);
    return <div>Recipe Details</div>;
}
