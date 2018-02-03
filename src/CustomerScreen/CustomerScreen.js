import React, { Component } from 'react';
import { Container, Content, Header, Card, CardItem, Right, Left, Body, Icon, Title, Button } from "native-base";
import { Image, View, ScrollView, TouchableNativeFeedback, TouchableOpacity, Text } from 'react-native';

const Platform = require('Platform')

export default class MovieScreen extends Component {
    static navigationOptions = {
        title: "用户界面",
        tabBarIcon: ({ tintColor }) => <Icon name="ios-person" style={{ color: tintColor, fontSize: 30 }} />
    }
    render() {
        const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
        const { likeMovies, expectMovies } = this.props.screenProps;
        const { navigate } = this.props.navigation;
        let lm = likeMovies.slice(0).reverse();
        let em = expectMovies.slice(0).reverse();
        
        return (
            <Container>
                <Header style={{ marginTop: 26 }}>
                    <Left>
                        <Text style={{fontSize: 20, color: "#fff"}}>电影日记</Text>
                    </Left>
                    <Body/>
                </Header>
                <Content style={{ flexDirection: "column", flex: 1}}>
                    <Card>
                        <CardItem header>
                            <Left>
                                <Text style={{fontSize: 16}}>喜欢的电影<Text style={{color: "grey", fontSize: 14}}>({likeMovies.length})</Text></Text>
                            </Left>
                            <Right>
                                <Button transparent
                                    onPress={() => navigate("Item", { data: likeMovies, kind: "LikeMovies"})}
                                >
                                    <Icon name="arrow-forward" style={{color: "blue"}}/>
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <ScrollView horizontal>
                                    {
                                        lm.map((item, index) =>
                                            <View key={item.id} style={index !== likeMovies.length - 1 ? { marginRight: 15, width: 65, overflow: "hidden" } : { width: 65, overflow: "hidden" }}>
                                                <Image source={{ uri: item.image }} style={{ width: 65, height: 91 }} />
                                            </View>
                                        )
                                    }
                                </ScrollView>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Left>
                                <Text style={{ fontSize: 16 }}>期待的电影<Text style={{color: "grey", fontSize: 14}}>({expectMovies.length})</Text></Text>
                            </Left>
                            <Right>
                                <Button transparent
                                    onPress={() => navigate("Item", { data: expectMovies, kind: "ExpectMovies"})}
                                >
                                    <Icon name="arrow-forward" style={{ color: "blue" }} />
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <ScrollView horizontal>
                                    {
                                        em.map((item, index) =>
                                            <View key={item.id} style={index !== expectMovies.length - 1 ? { marginRight: 15 } : {}}>
                                                <Image source={{ uri: item.image }} style={{ width: 65, height: 91 }} />
                                            </View>
                                        )
                                    }
                                </ScrollView>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Text style={{ fontSize: 16 }}>我的电影日记</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <View style={{ height: "100%", width: "100%", backgroundColor: "pink" }}></View>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}