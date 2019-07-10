
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';

export class ModalTeam extends Component {
    render() {
        return (
            <Overlay                
                height={150}
                isVisible={this.props.visible}>
                <View style={{ marginTop: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ margin: 5 }}>Equipo: {this.props.equipo.nombre}</Text>
                        <Text style={{ margin: 5 }}>Jugadores: {(this.props.equipo.jugadores) != undefined ? this.props.equipo.jugadores.length : 0}</Text>
                    </View>
                    <Button
                        buttonStyle={{ width: 100, alignSelf: 'center' }}
                        onPress={() => this.props.onToggleTeam()}
                        title='Cerrar'
                        type='outline'
                        icon={{ name: 'ios-football', type: 'ionicon' }}
                    />
                </View>
            </Overlay>
        )
    }
}