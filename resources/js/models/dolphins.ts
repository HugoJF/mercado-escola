import {createModel} from "@rematch/core";
import {delay}       from "./utils";
import {RootModel}   from ".";

export type DolphinsState = number;

// @ts-ignore
export const dolphins = createModel<RootModel>()({
    state: 0,
    reducers: {
        /**
         * lul
         * @param state - stateu
         * @param payload - pogu
         */
        set: (state: DolphinsState, payload: number) => payload,
        increment: (state: DolphinsState, amount: number) => state + amount
    },
    effects: (dispatch) => {
        const {dolphins} = dispatch;
        return {
            async incrementAsync(): Promise<void> {
                await delay(500);
                dolphins.increment(1);
            }
        };
    }
});
