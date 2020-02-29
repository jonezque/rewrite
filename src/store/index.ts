import { ISubject } from './action-creators';

export * from './actions';
export * from './action-creators';

export interface IStoreState {
    error: boolean;
    subjects: ISubject[];
    loading: boolean;
    count: number;
    title: string;
}
