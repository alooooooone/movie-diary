import React, { Component } from 'react';
import { Container, Content, Header, Item, Input, Button, Text, Card, CardItem, SwipeRow, Left, Right, Body, Thumbnail, Icon } from "native-base";
import { TouchableNativeFeedback, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

const Platform = require('Platform')

export default class MyMovieDiary extends Component {
    render() {
        return (
            <Container>
                <Header searchBar rounded style={Platform.OS === 'android' ? { marginTop: 26 } : {}}>
                    <Item>
                        <Icon name="search" />
                        <Input
                            placeholder="你想了解的电影"
                            onChangeText={this.handleInputText}
                            onSubmitEditing={this.handleSearchMovie} />
                    </Item>
                </Header>
                <Content contentContainerStyle={isSearching ? { flex: 1, justifyContent: 'center' } : {}}>
                    {isSearching ? <ActivityIndicator size="large" /> : this.renderMovie()}
                </Content>
            </Container>
        )
    }
}