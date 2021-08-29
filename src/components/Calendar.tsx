import FullCalendar, { EventInput } from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import React from "react";
import { IonPicker } from "@ionic/react";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

interface ICalendarState {
    lesson: EventInput[];
}

interface ICalendarProps {
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    constructor(props: ICalendarProps) {
        super(props);

        this.state = {
            lesson: [
                { title: 'event 1', date: '2021-08-21' },
                { title: 'event 2', date: '2021-08-22' }
            ]
        }
    }
    render() {
        const { lesson } = this.state;
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
                    events={lesson}
                    dayMaxEventRows={true}
                    eventClick={this.onEventClick}
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

    private handleDateClick(): void {
        alert("date clicked");
    }

    private onEventClick(): JSX.Element {
        // Ouvrir un dialog ou panel pour modifier le cours.
        return (
            <>
                <IonPicker columns={[{ name: "Cours1", options: [] }]} isOpen={true} />
            </>
        )
    }
}