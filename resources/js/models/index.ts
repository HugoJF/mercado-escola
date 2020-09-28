import {Models}   from "@rematch/core";
import {dolphins} from "./dolphins";
import {sharks}   from "./sharks";
import questions  from "./questions";
import {auth}     from "./auth";

export interface RootModel extends Models<RootModel> {
    // @ts-ignore
    dolphins: typeof dolphins;
    sharks: typeof sharks;
    questions: typeof questions;
    auth: typeof auth;
}

export const models: RootModel = {dolphins, sharks, questions, auth};
