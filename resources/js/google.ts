import {google, Loader} from "google-maps";

const loader = new Loader(process.env.MIX_GOOGLE_MAPS_KEY, {
    libraries: ['places'],
    language: 'pt-BR',
});

let instance: google | null = null;

export const load = async () => {
    instance = await loader.load();
};

export const Google = (): google => {
    if (instance === null) {
        throw new Error('Google API is not loaded');
    }

    return instance;
};
