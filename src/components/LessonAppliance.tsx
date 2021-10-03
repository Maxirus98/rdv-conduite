import { IonInput, IonItem, IonItemDivider, IonLabel, IonList } from '@ionic/react'
import { Agenda, Day, DragAndDrop, Inject, Month, Resize, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule'
import React, { Component } from 'react'

interface IApplianceState {
}
export default class LessonAppliance extends Component<{}, IApplianceState> {
    render() {
        return (
            <>
                <ScheduleComponent
                    views={['Day', 'Week', 'Month', 'Agenda']}


                >
                    <Inject services={[Day, Week, Month, Agenda, DragAndDrop, Resize]} />
                </ScheduleComponent>
            </>
        )
    }
}
