import { IonButton, IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Agenda, Day, DragAndDrop, EventClickArgs, Inject, Month, PopupCloseEventArgs, PopupOpenEventArgs, Resize, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { IInstructor } from "../modals/IInstructor";
import ILesson from "../modals/ILesson";
import { Lessons } from "../modals/Lessons";
import LessonService from "../services/LessonService";
import UserService from "../services/UserService";

interface ICalendarState {
    selectedEventData: Record<string, any>
    studentsName: string[];
    searchingStudents: boolean;
    lessons: ILesson[];
}

interface ICalendarProps {
    userService: UserService;
    lessonService: LessonService;
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    private studentsName: string[];
    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            selectedEventData: null,
            studentsName: null,
            searchingStudents: false,
            lessons: [],
        }
    }

    public render(): JSX.Element {
        const { lessons } = this.state;
        console.log("lessons", lessons);
        return (
            <>
                <ScheduleComponent
                    popupOpen={(args: PopupOpenEventArgs) => {
                        if (args.type == "QuickInfo") {
                            this.replaceQuickInfoTemplate();
                        }

                        document.querySelector(".e-title-text").textContent = "Modifier un cours à l'horaire";
                    }}
                    views={['Day', 'Week', 'Month', 'Agenda']}
                    popupClose={(args: PopupCloseEventArgs) => {
                        if (args.type == "QuickInfo") {
                            console.log("addInfo", args);
                            this.addLesson(args.data);
                        }
                    }}
                    eventSettings={{
                        dataSource: lessons,
                        fields: {
                            id: 'id',
                            subject: { name: 'subject' },
                            startTime: { name: 'startTime' },
                            endTime: { name: 'endTime' }
                        }
                    }}

                    startHour="11:00"
                    endHour="21:00"
                    eventClick={(args: EventClickArgs) => {
                        this.setState({ selectedEventData: args.event });
                    }}
                    editorTemplate={this.getEditorTemplate.bind(this)}
                    cellDoubleClick={(args: PopupOpenEventArgs) => {
                        args.cancel = true;
                    }}
                    showWeekend={false}
                >
                    <Inject services={[Day, Week, Month, Agenda, DragAndDrop, Resize]} />
                </ScheduleComponent>
            </>
        );
    }

    public async componentDidMount(): Promise<void> {
        var allStudents = await this.getAllStudent();
        await this.getAllLessons();
        this.setState({ studentsName: allStudents });

    }

    private replaceQuickInfoTemplate(): void {
        var cellPopup: ReactDOM.Container = document.querySelector(".e-cell-popup");
        var popupEventDetailsButton: ReactDOM.Container = document.querySelector(".e-event-details");
        var editor = React.createElement(this.getAppointmentTemplate, this);
        var popupContent: ReactDOM.Container;

        if (cellPopup)
            popupContent = cellPopup.querySelector(".e-popup-content");
        if (popupContent)
            ReactDOM.render(editor, popupContent);
        if (popupEventDetailsButton)
            ReactDOM.render(null, popupEventDetailsButton);
    }

    private getAppointmentTemplate(): JSX.Element {
        return (
            <>
                <h2 className="e-textLabel">Module/Sortie</h2>
                <DropDownListComponent
                    className="e-field e-input"
                    data-name="Subject"
                    dataSource={Object.keys(Lessons)}
                    placeholder="Module/Sortie"
                />
            </>
        );
    }

    private getEditorTemplate() {
        const { searchingStudents } = this.state;
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>Module/Sortie</IonCol>
                    <IonCol className="e-textLabel">
                        <DropDownListComponent
                            className="e-field e-input"
                            data-name="Subject"
                            dataSource={Object.keys(Lessons)}
                            placeholder="Module/Sortie"
                        /></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="e-textLabel">From</IonCol>
                    <IonCol>
                        <DateTimePickerComponent className="e-field"
                            id="StartTime"
                            data-name="StartTime"
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>To</IonCol>
                    <IonCol>
                        <DateTimePickerComponent
                            className="e-field" id="EndTime"
                            data-name="EndTime"
                            strictMode={true}
                        />
                    </IonCol>
                </IonRow>
                <IonSearchbar placeholder={"Nom Complet"} onFocus={() => {
                }} />
                <IonButton style={{ "display": "block" }} onClick={this.addStudentToLesson.bind(this)}>
                    Ajouter l'élève à la leçon.
                </IonButton>
            </IonGrid>
        );
    }

    private async getAllLessons(): Promise<void> {
        var response = await axios.get("http://localhost:8080/lesson/all");
        // Needed to show events on load.
        setTimeout(async () => this.setState({ lessons: response.data }), 100);
    }

    private async getAllStudent(): Promise<string[]> {
        const { userService } = this.props;
        /*if (sessionStorage.getItem("students") == null) {
            var students = await userService.getAllUsers();
            sessionStorage.setItem("students", JSON.stringify(students));
            students.map((student, key) => {
                this.studentsName[key] = student.name;
            })
        }*/
        return this.studentsName;
    }

    private async addLesson(eventData: any) {
        const { lessons } = this.state;
        console.log("data", eventData);
        const { lessonService } = this.props;
        var addedLesson: ILesson = await axios.post("http://localhost:8080/lesson/save", {
            id: eventData.id || eventData.Id,
            subject: eventData.Subject || eventData.subject,
            startTime: eventData.startTime || eventData.StartTime,
            endTime: eventData.endTime || eventData.EndTime
        } as ILesson);
        console.log("addedLesson", addedLesson);
        lessons.concat([addedLesson]);
        this.setState({ lessons });
    }

    private addStudentToLesson() {
        /*const { userService } = this.props;
        sessionStorage.removeItem("students");
        userService.saveOrUpdateUser({
            "id": 1,
            "name": "Max4",
            "surname": "Dup4",
            "address": "1234 rue dupuis, h3k 1c83",
            "phone": "514-962-00274",
            "email": "dupuismaxime4@hotmail.com"
        } as IUser);*/
    }

    private addInstructor() {
        const { userService } = this.props;
        userService.saveOrUpdateUser({
            "id": 5,
            "type": null,
            "name": "Instructor2",
            "surname": "Ctor3",
            "address": "1234 rue verdun, h3k 1c83",
            "phone": "514-444-7777",
            "email": "acom2@hotmail.com",
            "manualDriver": false,
            "yearsOfExperience": 7
        } as IInstructor);
    }
}