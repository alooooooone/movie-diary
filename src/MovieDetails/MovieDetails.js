import React, { Component } from 'react';
import { Container, Content, Text, Header, Button, Icon, Left, Right, Body, Card, CardItem, Thumbnail, Title } from "native-base";
import { ActivityIndicator, Image, View, ScrollView } from 'react-native';
import { NavigationActions } from "react-navigation";

const backAction = NavigationActions.back();

export default class MovieDetails extends Component{
    static navigationOptions = {
        title: "电影详情"
    }
    constructor(props){
        super(props);
        this.state = {
            Details: [],
            isSearching: null
        }
    }
    componentWillMount(){
        this.setState({isSearching: true})
        fetch(`https://api.douban.com/v2/movie/subject/${this.props.navigation.state.params.id}`)
        .then((response) => response.json())
        .then((jsondata) => {
            this.setState({
                Details: jsondata,
                isSearching: false
            })
        })
    }
    renderMovieDetails() {
        const { Details } = this.state;

        return (
            <Content>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>{Details.title}<Text note>({Details.year})</Text></Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Thumbnail square source={{uri: Details.images.medium}} style={{width: 135, height: 189}}/>
                            </Left>
                            <Body>
                                <Text><Text style={{color: "grey"}}>导演:</Text>{Details.directors.map((director, index) =>
                                    index !== Details.directors.length - 1 ? director.name + '/' : director.name
                                )}</Text>
                                <Text><Text style={{ color: "grey" }}>主演:</Text>{Details.casts.map((cast, index) =>
                                    index !== Details.casts.length - 1 ? cast.name + '/' : cast.name
                                )}</Text>
                                <Text><Text style={{ color: "grey" }}>类型:</Text>{Details.genres.map((genre, index) =>
                                    index !== Details.genres.length - 1 ? genre + '/' : genre
                                )}</Text>
                                <Text><Text style={{ color: "grey" }}>制片国家地区:</Text>{Details.countries.map((country, index) =>
                                    index !== Details.countries.length - 1 ? country + '/' : country
                                )}</Text>
                                <Text><Text style={{ color: "grey" }}>又名:</Text>{Details.aka.map((name, index) =>
                                    index !== Details.aka.length - 1 ? name + '/' : name
                                )}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ flex: 1, marginBottom: 20 }}>主演</Text>
                                <View style={{flexDirection: "row",flex: 1}}>
                                    {
                                        Details.casts !== [] && Details.casts.map((actor, index) => 
                                            <View key={actor.id} style={index !== Details.length - 1 ? { marginRight: 15, width: 65, overflow: "hidden" } : { width: 65, overflow: "hidden" }}>
                                                {actor.avatars?<Image source={{ uri: actor.avatars.small }} style={{ width: 65, height: 91 }} />: null}
                                                <Text style={{textAlign: "center"}}>{actor.name}</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ flex: 1, marginBottom: 20 }}>剧情简介</Text>
                                <Text>
                                    {Details.summary}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer></CardItem>
                    </Card>
                </Content>
            </Content>
        )
    }
    render() {
        let { isSearching } = this.state;

        return (
            <Container>
                <Header style={{ marginTop: 26 }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.dispatch(backAction)}
                        >
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#fff" }}>电影详情</Title>
                    </Body>
                    <Right></Right>
                </Header>
                {isSearching ? <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </Content> : this.renderMovieDetails() }
            </Container>
        )
    }
}