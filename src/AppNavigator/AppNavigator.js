import React, { Component } from 'react';
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import MovieScreen from "../MovieScreen/MovieScreen";
import CustomerScreen from "../CustomerScreen/CustomerScreen";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieItem from "../MovieItem/MovieItem";
import MyMovieDiary from "../MyMovieDiary/MyMovieDiary";
import DiaryEditPage from "../MyMovieDiary/DiaryEditPage";

const MainScreenNavigator = TabNavigator({
    Movie: {
        screen: MovieScreen
    },
    Customer: {
        screen: CustomerScreen
    }
},{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazy: true,
    initialRouteName: 'Movie',
    order: (['Movie', 'Customer']),
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: "blue",
        style: {
            backgroundColor: 'white',
            height: 50,
        }
    }
})
const AppNavigator = StackNavigator({
    Home: {
        screen: MainScreenNavigator
    },
    Details: {
        screen: MovieDetails
    },
    Item: {
        screen: MovieItem
    },
    Diary: {
        screen: MyMovieDiary
    },
    Edit: {
        screen: DiaryEditPage
    }
},{
   headerMode: 'none',
   mode: 'modal',
   navigationOptions: {
     gesturesEnabled: false,
   }
})

export default AppNavigator;