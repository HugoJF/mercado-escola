import {AxiosRequestConfig} from "axios";

export const bxios = () => new Bxios;

export class Bxios {
    private method: AxiosRequestConfig['method'] = 'get';
    private url: string = '';
    private headers: { [header: string]: string } = {};
    private data: any;
    private formData: FormData | undefined = undefined;
    private custom: AxiosRequestConfig = {};

    constructor() {
        this.headers['Accept'] = 'application/json';
    }

    get(...url: (string | any)[]) {
        this.parseUrl(url);
        this.method = 'get';

        return this;
    }

    post(...url: (string | any)[]) {
        this.parseUrl(url);
        this.method = 'post';

        return this;
    }

    patch(...url: (string | any)[]) {
        this.parseUrl(url);
        this.method = 'patch';

        return this;
    }

    delete(...url: (string | any)[]) {
        this.parseUrl(url);
        this.method = 'delete';

        return this;
    }

    body(data: any) {
        this.setData(data);

        return this;
    }

    setCustom(data: AxiosRequestConfig) {
        this.custom = data;

        return this;
    }

    setData(data: any) {
        if (data instanceof FormData) {
            this.formData = data;
        } else {
            this.data = data;
        }

        return this;
    }

    multipartFormData() {
        this.headers['Content-Type'] = 'multipart/form-data';

        return this;
    }

    patchFormDataFix() {
        // https://github.com/laravel/framework/issues/13457
        if (this.formData) {
            this.formData.append('_method', 'PATCH');
            this.method = 'post';
        }

        return this;
    }

    send<T>() {
        return window.axios.request<T>({
            method: this.method,
            url: this.url,
            data: this.formData ?? this.data,
            ...this.custom,
        })
    }

    private parseUrl(url: string | any[]) {
        if (!Array.isArray(url)) {
            url = [url];
        }

        url = ['api', ...url];
        url = url.join('/');

        if (!url.startsWith('/')) {
            url = '/' + url;
        }

        this.url = url;
    }
}
