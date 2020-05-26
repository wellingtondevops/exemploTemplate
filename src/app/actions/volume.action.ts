import { Action } from '@ngrx/store';

export enum VolumeAction {
    Add = 'ADD',
    Remove = 'REM',
    Clear = 'CLE',
}

export const Add = (formSearch: any) => {
    return <Action>{ type: VolumeAction.Add, payload: formSearch };
}

export const Remove = (formSearch: any) => {
    return <Action>{ type: VolumeAction.Remove, payload: formSearch };
}

export const Clear = () => {
    return <Action>{ type: VolumeAction.Clear, payload: null };
}