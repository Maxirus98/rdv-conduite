import { IonButton, IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Agenda, Day, DragAndDrop, EventClickArgs, Inject, Month, PopupOpenEventArgs, Resize, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import React from "react";
import ReactDOM from "react-dom";
import { Lessons } from "../modals/Lessons";
import LessonService from "../services/LessonService";
import UserService from "../services/UserService";

interface ICalendarState {
    selectedEventData: Record<string, any>
    studentsName: string[];
    searchingStudents: boolean;
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
            searchingStudents: false
        }
    }

    public render(): JSX.Element {
        return (
            <>
                <ScheduleComponent
                    showHeaderBar={false}
                    popupOpen={(args: PopupOpenEventArgs) => {
                        if (args.type == "QuickInfo") {
                            this.replaceQuickInfoTemplate();
                        }

                        document.querySelector(".e-title-text").textContent = "Modifier un cours à l'horaire";
                    }}
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
        const { studentsName } = this.state
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
                <IonButton style={{ "display": "block" }} onClick={this.addStudent.bind(this)}>
                    Ajouter l'élève à la leçon.
                </IonButton>
            </IonGrid>
        );
    }

    private async getAllLessons(): Promise<void> {
        const { lessonService } = this.props;
        if (sessionStorage.getItem("lessons") == null) {
            var lessons = await lessonService.getAll();
            sessionStorage.setItem("lessons", JSON.stringify(lessons));
        }
    }

    private async getAllStudent(): Promise<string[]> {
        const { userService } = this.props;
        if (sessionStorage.getItem("students") == null) {
            var students = await userService.getAll();
            sessionStorage.setItem("students", JSON.stringify(students));
            students.map((student, key) => {
                this.studentsName[key] = student.name;
            })
        }
        return this.studentsName;
    }

    private addStudent() {
        sessionStorage.removeItem("students");
    }
}