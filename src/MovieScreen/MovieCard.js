import React, { Component } from 'react';
import { Icon, Button, Text, Card, CardItem, Left, Right, Body, Thumbnail } from "native-base";
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native';

const Platform = require('Platform')

export default class MovieCard extends Component {
    _onPress = () => this.props.navigate("Details", { id: this.props.item.id })

    haveLike = (id) => {
        console.log("hello")
        let movie = this.props.likeMovies

        for (let index = 0; index < movie.length; index++) {
            if (movie[index].id === id) {
                return true
            }

        }

        return false;
    }
    haveExpect = (id) => {
        let movie = this.props.expectMovies;

        for (let index = 0; index < movie.length; index++) {
            if (movie[index].id === id) {
                return true
            }

        }

        return false;
    }

    render() {
        const { item, likeMovies, expectMovies, handleChangeLikeMovies, handleChangeExpectMovies } = this.props;
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

        return (
            <Touchable key={item.id} onPress={this._onPress}>
                <Card key={item.id}>
                    <CardItem>
                        <Left>
                            <Thumbnail square source={{ uri: item.images.small }} style={{ width: 65, height: 91 }} />
                            <Body>
                                <Text>{item.title}</Text>
                                <Text note>上映日期:{item.year}</Text>
                                <Text>导演:{item.directors.map((director, index) =>
                                    index !== item.directors.length - 1 ? director.name + '/' : director.name
                                )}</Text>
                                <Text>主演:{item.casts.map((cast, index) =>
                                    index !== item.casts.length - 1 ? cast.name + '/' : cast.name
                                )}</Text>
                                <Text>类型:{item.genres.map((genre, index) =>
                                    index !== item.genres.length - 1 ? genre + '/' : genre
                                )}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent vertical>
                                <Icon name="ios-star" />
                                <Text>{item.rating.average === 0 ? "暂无评分" : item.rating.average}</Text>
                            </Button>
                        </Left>
                        <Right style={{ flexDirection: "row" }}>
                            <Button small light info={this.haveLike(item.id)} style={{ marginLeft: 20, marginRight: 10 }}
                                onPress={handleChangeLikeMovies({
                                    id: item.id,
                                    title: item.title,
                                    rating: item.rating.average,
                                    image: item.images.small,
                                    year: item.year
                                })}
                            >
                                <Text>喜欢</Text>
                            </Button>
                            <Button small light info={this.haveExpect(item.id)}
                                onPress={handleChangeExpectMovies({
                                    id: item.id,
                                    title: item.title,
                                    rating: item.rating.average,
                                    image: item.images.small,
                                    year: item.year
                                })}
                            >
                                <Text>期待</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Touchable>
        )
    }
}