import React, { Component } from 'react';
import { ListView } from 'react-native';
import { NavigationActions } from "react-navigation";
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Title, Left, Body, Right } from 'native-base';
const backAction = NavigationActions.back();
export default class MovieItem extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: this.props.navigation.state.params.data,
        };
    }
    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        let fun = "handleChange" + this.props.navigation.state.params.kind;
        this.props.screenProps[fun](this.state.listViewData[rowId])();
        this.setState({ listViewData: newData });
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
                        <Title>电影日记</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem>
                                <Left>
                                    <Text>{data.title}</Text>
                                    <Text note>豆瓣评分:{data.rating}</Text>
                                </Left>
                                <Right>
                                    <Button small
                                        onPress={() => this.props.navigation.navigate("Details", { id: data.id })}
                                    >
                                        <Text>详情</Text>
                                    </Button>
                                </Right>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button full onPress={() => this.props.navigation.navigate("Edit", {data: data})}>
                                <Icon active name="add" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        enableEmptySections={true}
                    />
                </Content>
            </Container>
        );
    }
}