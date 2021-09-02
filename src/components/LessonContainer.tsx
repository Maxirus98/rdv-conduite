import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonRow } from '@ionic/react';
import React, { Component } from 'react';
import ILesson from '../modals/ILesson';

interface ILessonProps {

}

interface ILessonState {
    lessonPicker: JSX.Element;
    lessons: ILesson[];
}
export default class LessonContainer extends Component<ILessonProps, ILessonState> {
    constructor(props: ILessonProps) {
        super(props);

        this.state = {
            lessonPicker: <></>,
            lessons: []
        }
    }

    public render(): JSX.Element {
        const { lessonPicker, lessons } = this.state;
        return (
            <>
                <IonButton id="createLesson" onClick={() => { }}>Créer un cours à l'horaire</IonButton>
                <IonRow id='external-events'>
                    {lessons.map(lesson => {
                        return <IonCol className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
                            <IonCard className='fc-event-main'>
                                <IonCardHeader>
                                    <IonCardTitle>{lesson.name}</IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                    })}
                </IonRow>
                {lessonPicker}
            </>
        )
    }

    public async componentDidMount(): Promise<void> {
        var containerEl = document.getElementById('external-events');
        // Please import the top-level fullcalendar lib before attempting to import a plugin
        /*new Draggable(containerEl, {
            itemSelector: '.fc-event',
            eventData: function (eventEl) {
                return {
                    title: eventEl.innerText
                };
            },
            longPressDelay: 500
        });*/
    }

    //onDrag is not being called for some reason
    private removeLastLesson() {
        const { lessons } = this.state;
        lessons.pop()
        console.log(lessons);
        this.setState({ lessons });
    }

    /*private showLessonPicker = () => {
        const { lessons } = this.state;
        this.setState({
            lessonPicker: <IonPicker
                columns={[{
                    name: "Lessons", options: this.allLessons.map(lesson => {
                        return { text: lesson, value: lesson }
                    })
                } as PickerColumn]}
                buttons={[
                    {
                        text: "Ajouter",
                        handler: (value) => {
                            lessons.push({ name: value.Lessons.text as Lessons } as ILesson)
                            this.setState({ lessons });
                        }
                    }
                ]}

                isOpen={true}
                onDidDismiss={() => this.setState({ lessonPicker: <></> })}
            />
        })
    }*/
}
