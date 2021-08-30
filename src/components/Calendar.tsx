import FullCalendar, { EventInput, WindowScrollController } from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import React from "react";
import { IonPicker } from "@ionic/react";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Lessons } from "../modals/Lessons";
import ILesson from "../modals/ILesson";

interface ICalendarState {
    lessons: EventInput[];
}

interface ICalendarProps {
    handleShowLesson: () => void;
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    constructor(props: ICalendarProps) {
        super(props);

        this.state = {
            lessons: [
                { title: 'event 1', date: '2021-08-21' },
                { title: 'event 2', date: '2021-08-22' }
            ]
        }
    }

    public render(): JSX.Element {
        const { handleShowLesson } = this.props;
        const { lessons } = this.state;
        // I want to drag events to reschedule events with NO STUDENTS
        return (
            <>
                <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                    locale='fr'
                    headerToolbar={{
                        left: 'today',
                        center: 'title prev,next',
                        right: 'dayGridMonth dayGridWeek dayGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    droppable={true}
                    longPressDelay={500}
                    dateClick={this.handleDateClick}
                    selectMirror={true}
                    unselectAuto={true}
                    events={lessons}
                    eventDrop={this.handleEventDrop}
                    dayMaxEventRows={true}
                    eventClick={handleShowLesson}
                    dayMaxEvents={true}
                    weekends={true}
                    buttonText={{
                        today: 'Aujourd\'hui',
                        month: 'Mois courant',
                        week: 'Semaine courante',
                        day: 'Jour'
                    }}
                />
            </>
        );
    }

    // Change the Date on Drop.
    private handleEventDrop = (): void => {
        const { lessons } = this.state
        this.setState({ lessons });
        console.log("lessons", lessons);
    }

    private handleDateClick(): void {
        alert("date clicked");
    }
}