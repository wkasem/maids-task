import { createReducer, on } from '@ngrx/store';
import { startLoading , stopLoading } from './loading.actions';

export interface LoadingState {
  loading: boolean;
}

export const initialState: LoadingState = {
  loading: false,
};

export const loadingReducer = createReducer(
  initialState,
  on(startLoading, state => ({ ...state, loading : true })),
  on(stopLoading, state => ({ ...state, loading : false }))
);