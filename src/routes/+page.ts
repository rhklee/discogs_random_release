import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
    const randomRelease = Math.floor(Math.random() * 16575315) + 1;
    const res = await fetch(`https://api.discogs.com/releases/${randomRelease}`);
    if(res.status !== 200) {
        return { item: undefined, releaseId: randomRelease };
    }
    const item = await res.json();

    return { item, releaseId: randomRelease };
};