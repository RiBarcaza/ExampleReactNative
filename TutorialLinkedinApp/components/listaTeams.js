import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

export class ListaTeams extends Component {

    render() {
        return (
            <View>
                {
                    this.props.listEquipos.map(equipo => (
                        <ListItem
                            key={equipo.id}
                            title={equipo.nombre}
                            leftAvatar={{ source: { uri: equipo.logo } }}
                            subtitle={(equipo.estado) ? 'Activo' : 'Inactivo'}
                            onPress={() => this.props.onSelectTeam(equipo)}
                            chevron
                            topDivider={false}
                            bottomDivider
                        />
                    ))
                }
            </View>
        )
    }
}