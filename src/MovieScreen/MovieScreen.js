import React, { Component } from 'react';
import { Container, Content, Header, Item, Input, Button, Text, Card, CardItem, SwipeRow, Left, Right, Body, Thumbnail, Icon } from "native-base";
import { TouchableNativeFeedback, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

const Platform = require('Platform')

export default class MovieScreen extends Component{
    static navigationOptions = {
        title: "电影搜索",
        tabBarIcon: ({ tintColor }) => <Icon name="ios-film" style={{ color: tintColor, fontSize: 30 }} />
    }
    constructor(props){
        super(props);
        this.state = {
            searchText: "",
            movieData: [],
            isSearching: null
        }
    }
    handleInputText = (text) => {
        this.setState({
            searchText: text
        })
    }
    handleSearchMovie = () => {
        let text = this.state.searchText;

        if (text !== ""){
            this.setState({
                isSearching: true
            })

            fetch(`https://api.douban.com/v2/movie/search?q=${text}`)
            .then((response) => response.json())
            .then((jsondata) => {
                this.setState({
                    movieData: jsondata.subjects,
                    isSearching: false
                })
            })
        }
    }
    haveLike = (id) => {
        let movie = this.props.screenProps.likeMovies

        for (let index = 0; index < movie.length; index++) {
            if (movie[index].id === id) {
                return true
            }

        }

        return false;
    }
    haveExpect = (id) => {
        let movie = this.props.screenProps.expectMovies

        for (let index = 0; index < movie.length; index++) {
            if (movie[index].id === id) {
                return true
            }

        }

        return false;
    }
    renderMovie(){
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        const { navigate } = this.props.navigation;
        const { handleChangeLikeMovies, handleChangeExpectMovies} = this.props.screenProps;

        return (
            this.state.movieData.map((item) => (
                <Touchable key={item.id} onPress={() => navigate("Details",{id: item.id})}>
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
                                        year: item.year,
                                        directors: item.directors,
                                        casts: item.casts
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
                                        year: item.year,
                                        directors: item.directors,
                                        casts: item.casts
                                    })}
                                >
                                    <Text>期待</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Touchable>
            ))
        )
    }

    render() {
        let { isSearching, movieData } = this.state;

        return (
            <Container>
                <Header searchBar rounded style={Platform.OS === 'android' ? { marginTop: 26 } : {}}>
                    <Item>
                        <Icon name="search" />
                        <Input
                            placeholder="你想了解的电影"
                            onChangeText={this.handleInputText}
                            onSubmitEditing={this.handleSearchMovie}/>
                    </Item>
                </Header>
                <Content contentContainerStyle={ isSearching ? {flex: 1,justifyContent: 'center'} : {}}>
                    {isSearching ? <ActivityIndicator size="large" /> : this.renderMovie()}
                </Content>
            </Container>
        )
    }
}