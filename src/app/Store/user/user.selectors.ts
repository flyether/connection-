import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../core/models/interface';

export const userSelector = createFeatureSelector<User>('user');

export const GivMeProfile = createSelector(
  userSelector,
  (state) => state.profile
);
