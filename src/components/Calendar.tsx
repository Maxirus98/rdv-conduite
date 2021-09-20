import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonItemDivider, IonList, IonRow, IonSearchbar, IonTitle } from "@ionic/react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent, FilteringEventArgs, PopupEventArgs, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Agenda, Day, DragAndDrop, EventClickArgs, Inject, Month, PopupCloseEventArgs, PopupOpenEventArgs, Resize, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { IInstructor } from "../models/IInstructor";
import ILesson from "../models/ILesson";
import { IUser } from "../models/IUser";
import { Lessons } from "../models/Lessons";
import LessonService from "../services/LessonService";
import UserService from "../services/UserService";
import { Query } from '@syncfusion/ej2-data';
import { closeCircleOutline, closeOutline, person, personCircleOutline } from "ionicons/icons";

interface ICalendarState {
    selectedEventData: Record<string, any>
    studentsName: string[];
    searchingStudents: boolean;
    lessons: ILesson[];
    searchText: string;
    preAddedUsers: IUser[];
}

interface ICalendarProps {
    users: IUser[];
    userService: UserService;
    lessonService: LessonService;
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    private studentsName: string[];
    private userNames = [];
    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            selectedEventData: null,
            studentsName: null,
            searchingStudents: false,
            lessons: [],
            searchText: "",
            preAddedUsers: [],
        }
    }

    public render(): JSX.Element {
        const { lessons } = this.state;
        return (
            <>
                <ScheduleComponent
                    popupOpen={(args: PopupOpenEventArgs) => {
                        if (args.type == "QuickInfo") {
                            this.replaceQuickInfoTemplate();
                        }

                        document.querySelector(".e-title-text").textContent = "Modifier la liste des participants";
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
        const { users } = this.props;
        await this.getAllLessons();
        // Changes users to an Object[] with FullName key
        users.map((user, key) => {
            this.userNames.push(new Object({ FullName: user.fullName, User: user }));
            console.log(key, this.userNames);
        })
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
        const { preAddedUsers } = this.state;
        var searchedUserNames: string[] = [];
        return (
            <IonGrid>
                <DropDownListComponent
                    className="e-field e-input"
                    data-name="Users"
                    dataSource={this.userNames}
                    placeholder="Ajouter des participants"
                    filtering={this.onFiltering.bind(this)}
                    allowFiltering={true}
                    fields={{ text: "FullName", value: "User" }}
                    select={(args: SelectEventArgs) => {
                        console.log("args", args);
                        var user = JSON.stringify(args.item.textContent);
                        this.addPreAddedUser(JSON.parse(user));
                    }}
                />
                <IonTitle size="small" style={{ marginTop: "1em", textAlign: "center" }}>Participants: </IonTitle>
                <IonItemDivider />
                <IonList>
                    {preAddedUsers.map((user, key) => {
                        console.log("pre added user", user);
                        return <IonItem key={key}>
                            <IonIcon color="success" icon={personCircleOutline} />
                            {user}
                            <IonIcon
                                icon={closeOutline}
                                color="danger"
                                onClick={() => console.log("deleted user")} /></IonItem>
                    })}
                </IonList>
            </IonGrid>
        );
    }

    public onFiltering(args: FilteringEventArgs) {
        let query = new Query();
        query = (args.text !== "") ? query.where("FullName", "contains", args.text, true) : query;
        args.updateData(this.userNames, query);
    }

    private async getAllLessons(): Promise<void> {
        var response = await axios.get("http://localhost:8080/lesson/all");
        setTimeout(async () => this.setState({ lessons: response.data }), 200);
    }

    private addPreAddedUser(user: IUser) {
        const { preAddedUsers } = this.state;
        this.setState({ preAddedUsers: [...preAddedUsers, user] })
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

    private addUsersToLesson(lesson: ILesson, user: IUser[]) {
        lesson.users.concat(user);
        axios.post("http://localhost:8080/lesson/save", lesson);
    }

    private deleteUserFromLesson(lessonId: number, userId: number) {

    }
}