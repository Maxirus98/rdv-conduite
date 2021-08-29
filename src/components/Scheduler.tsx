import React from 'react'
import { IonButton, IonPicker } from '@ionic/react'
import Calendar from './Calendar'

export default class Scheduler extends React.Component<{}, {}> {
    render() {
        return (
            <>
                <IonButton id="createLesson">Créer un cours à l'horaire</IonButton>
                <Calendar />
            </>
        )
    }
}
