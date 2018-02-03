import React, { Component } from 'react';
import { TabNavigator, TabBarBottom, } from "react-navigation";

import AppNavigator from "./src/AppNavigator/AppNavigator";
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})
export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            likeMovies: [],
            expectMovies: [],
        }
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
    }
    componentDidMount(){
        storage.load({
            key: 'likeMovies',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            this.setState({ likeMovies: ret || [] });
        }).catch(err => {
            console.warn(err.message);
        })
        storage.load({
            key: 'expectMovies',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            this.setState({ expectMovies: ret || [] });
        }).catch(err => {
            console.warn(err.message);
        })
    }
    handleChangeLikeMovies = (movie) => {
        return () => {
            let copyData = this.state.likeMovies.slice(0), index = -1;

            for (let i = 0; i < copyData.length; i++) {
                if (copyData[i].id === movie.id) {
                    index = i;
                }

            }

            if ( index !== -1 ){
                copyData.splice(index,1)
            }else{
                copyData.push(movie);
            }

            this.setState({
                likeMovies: copyData
            })
            storage.save({
                key: 'likeMovies',
                data: copyData,
                expires: 1000 * 3600
            });
        }
    }
    handleChangeExpectMovies = (movie) => {
        return () => {
            let copyData = this.state.expectMovies.slice(0), index = -1;

            for (let i = 0; i < copyData.length; i++) {
                if (copyData[i].id === movie.id) {
                    index = i;
                }

            }

            if (index !== -1) {
                copyData.splice(index, 1)
            } else {
                copyData.push(movie);
            }

            this.setState({
                expectMovies: copyData
            })
            storage.save({
                key: 'expectMovies',
                data: copyData,
                expires: 1000 * 3600
            });
        }
    }
    render() {
        return (
            <AppNavigator
                screenProps={
                    {
                        likeMovies: this.state.likeMovies,
                        expectMovies: this.state.expectMovies,
                        handleChangeLikeMovies: this.handleChangeLikeMovies,
                        handleChangeExpectMovies: this.handleChangeExpectMovies,
                    }
                }
                style={{marginTop: 26}}
            >
            </AppNavigator>
        )
    }
}