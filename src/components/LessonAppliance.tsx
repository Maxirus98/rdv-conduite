import { Agenda, Day, DragAndDrop, EventClickArgs, Inject, Month, Resize, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import React, { Component } from 'react';
import ILesson from '../models/ILesson';

interface IApplianceState {
    selectedEventData: ILesson;
}
interface IApplianceProps {
    lessons: ILesson[];
}
export default class LessonAppliance extends Component<IApplianceProps, IApplianceState> {
    private lessonInit = {
        id: null,
        subject: null,
        startTime: null,
        endTime: null,
        users: []
    } as ILesson;
    constructor(props: IApplianceProps) {
        super(props);

        this.state = {
            selectedEventData: this.lessonInit
        }
    }
    render() {
        const { lessons } = this.props;
        return (
            <>
                <ScheduleComponent
                    views={['Day', 'Week', 'Month', 'Agenda']}
                    eventSettings={{
                        dataSource: lessons,
                        fields: {
                            id: 'id',
                            subject: { name: 'subject' },
                            startTime: { name: 'startTime' },
                            endTime: { name: 'endTime' }
                        }
                    }}
                    startHour="10:00"
                    endHour="21:00"
                    eventClick={(args: EventClickArgs) => {
                        this.setState({ selectedEventData: args.event as ILesson });
                    }}
                    firstDayOfWeek={1}
                >
                    <Inject services={[Day, Week, Month, Agenda, DragAndDrop, Resize]} />
                </ScheduleComponent>
            </>
        )
    }
}
