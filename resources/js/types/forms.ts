import {Control, FieldPath} from "react-hook-form";

export type FileWithPreview = { file: File, preview: string };

export type FormProps<T> = {
    name: FieldPath<T>;
    control: Control<T>;
}
