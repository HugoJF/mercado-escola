import {google, Loader, LoaderOptions} from "google-maps";

const options: LoaderOptions = {/* todo */};
const loader = new Loader(process.env.MIX_GOOGLE_MAPS_KEY, {
    libraries: ['places']
});

let instance: google|null = null;

export const load = async () => {
    console.log('env', process.env);
    instance = await loader.load();
};

export const Google = (): google => {
    if (instance === null) {
        throw new Error('Google API is not loaded');
    }

    return instance;
};
