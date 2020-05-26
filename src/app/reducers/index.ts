import { VolumeAction } from '../actions/volume.action';
import { ActionModel } from '../models/action';
import { VolumeSearch } from '../models/volume.search';

export const volumeSearch = new VolumeSearch();

export function cartReducer(state = volumeSearch, action: ActionModel) {
    switch (action.type) {
        case VolumeAction.Add:
            {
                // state.products.push(action.payload);

                console.log(state);
                return state;
            };

        case VolumeAction.Remove:
            {
                //const index = state.products.indexOf(action.payload);
                //state.products.splice(index, 1);

                console.log(state);
                return state;
            };

        case VolumeAction.Clear:
            {
                // state = new CartModel();

                console.log(state);
                return state;
            }

        default:
            return state;
    }


}