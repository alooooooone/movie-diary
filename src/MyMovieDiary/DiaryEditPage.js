import React, { Component } from 'react';
import { Container, Content, Header, Item, Input, Button, Text, Card, CardItem, SwipeRow, Left, Right, Body, Thumbnail, Icon ,Title } from "native-base";
import { TextInput, Dimensions, Keyboard, View } from 'react-native';
import { NavigationActions } from "react-navigation";
const backAction = NavigationActions.back();

const Platform = require('Platform')

export default class DiaryEditPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleHeight: 0,
            cardY: 0,
            cursorY: 0,
        }
    }
    componentWillMount() {
        this.keyboardWillShowSub =  Platform.OS === 'ios' ?
            Keyboard.addListener('keyboardWillShow', this.keyboardWillShow) : Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Platform.OS === 'ios' ?
            Keyboard.addListener('keyboardWillHide', this.keyboardWillHide) : Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }
    componentDidMount() {
        // this.myComponent.measure((fx, fy, width, height, px, py) => {
        //     console.log('Component width is: ' + width)
        //     console.log('Component height is: ' + height)
        //     console.log('X offset to frame: ' + fx)
        //     console.log('Y offset to frame: ' + fy)
        //     console.log('X offset to page: ' + px)
        //     console.log('Y offset to page: ' + py)
        // })
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (e) => {
        this.setState({ visibleHeight: Math.ceil(e.endCoordinates.height) })
    }

    keyboardWillHide = (e) => {
        this.setState({ visibleHeight: 0 })
    }
    _onSelectionChange = (event) => {
        this.setState({
            cursorY: event.nativeEvent.selection.start
        })
    }

    render() {
        const { data } = this.props.navigation.state.params;
        return (
            <Container>
                <Header style={Platform.OS === 'android' ? { marginTop: 26 } : {}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.dispatch(backAction)}
                        >
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>我的电影日记</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Left style={{ flex: 3 }}>
                                <Thumbnail square source={{ uri: data.image }} style={{ width: 65, height: 91 }} />
                                <Body>
                                    <Text>{data.title}</Text>
                                    <Text note>上映日期:{data.year}</Text>
                                    <Text>导演:{data.directors.map((director, index) =>
                                        index !== data.directors.length - 1 ? director.name + '/' : director.name
                                    )}</Text>
                                    <Text>主演:{data.casts.map((cast, index) =>
                                        index !== data.casts.length - 1 ? cast.name + '/' : cast.name
                                    )}</Text>
                                </Body>
                            </Left>
                            <Right style={{ flex: 1 }}>
                                <Button small
                                    onPress={() => this.props.navigation.navigate("Details", { id: data.id })}
                                >
                                    <Text>详情</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card
                        onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            this.setState({
                                cardY: layout.y
                            })
                        }}
                    >
                        <CardItem cardBody>
                            <Input style={{ minHeight: 300, height: "auto", textAlignVertical: 'top', padding: 10 }} multiline={true}
                                onSelectionChange={this._onSelectionChange}
                            />
                        </CardItem>
                    </Card>
                </Content>
                <View style={{ height: this.state.visibleHeight }}></View>
            </Container>
        )
    }
}