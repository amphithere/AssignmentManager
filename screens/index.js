import { Navigation } from 'react-native-navigation';

import AssignmentScreen from './Assignments';
import CourseScreen from './Course';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => AssignmentScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => CourseScreen);
}