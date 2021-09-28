import { IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonItem, IonItemDivider, IonList, IonTitle } from "@ionic/react";
import { Query } from '@syncfusion/ej2-data';
import { DropDownListComponent, FilteringEventArgs, MultiSelectComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Agenda, Day, DragAndDrop, EventClickArgs, Inject, Month, PopupCloseEventArgs, PopupOpenEventArgs, Resize, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import { debounce } from "@syncfusion/ej2-base";
import axios from "axios";
import { checkmarkCircle, checkmarkOutline, closeOutline, personCircleOutline, save, trash } from "ionicons/icons";
import React from "react";
import ReactDOM from "react-dom";
import ILesson from "../models/ILesson";
import { IUser } from "../models/IUser";
import { Lessons } from "../models/Lessons";
import LessonService from "../services/LessonService";
import UserService from "../services/UserService";
import "./Calendar.css";

interface ICalendarState {
    selectedEventData: ILesson;
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
    private userNames = [];
    private lessonInit = {
        id: null,
        subject: null,
        startTime: null,
        endTime: null,
        users: []
    };


    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            selectedEventData: this.lessonInit,
            searchingStudents: false,
            lessons: [this.lessonInit],
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
                        if (args.type == "DeleteAlert")
                            console.log("args", args);
                        document.querySelector(".e-title-text").textContent = "Modifier la liste des participants";
                    }}
                    views={['Day', 'Week', 'Month', 'Agenda']}
                    popupClose={(args: PopupCloseEventArgs) => {
                        if (args.type == "QuickInfo") {
                            console.log("addInfo", args);
                            this.addLesson(args.data);
                        }
                        if (args.type == "Editor") {
                            this.setState({ selectedEventData: this.lessonInit, preAddedUsers: [] });
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
                        this.setState({ selectedEventData: args.event as ILesson }, () => console.log("eventData", this.state.selectedEventData));
                    }}
                    editorTemplate={this.getEditorTemplate.bind(this)}
                    cellDoubleClick={(args: PopupOpenEventArgs) => {
                        args.cancel = true;
                    }}
                    resizeStop={(args) => this.addLesson(args.data)}
                    dragStop={(args) => this.addLesson(args.data)}
                    firstDayOfWeek={1}
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
            console.log("user to string", Object.values(user).toString());
            this.userNames.push({
                FullName: user.fullName, User: Object.values(user).toString()
            });
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
        const { preAddedUsers, lessons } = this.state;
        return (
            <>
                <IonGrid>
                    <DropDownListComponent
                        className="e-field e-input"
                        data-name="Users"
                        dataSource={this.userNames}
                        placeholder="Ajouter des participants"
                        filtering={this.onFiltering.bind(this)}
                        allowFiltering={true}
                        fields={{ text: "FullName", value: "User" }}
                        select={
                            this.addPreAddedUser.bind(this)
                        }
                    />
                    <IonTitle size="small" style={{ marginTop: "1em", textAlign: "center" }}>Participants: </IonTitle>
                    <IonItemDivider />
                    <IonList>
                        {lessons.length > 0 && lessons.map((lesson) => {
                        })}
                    </IonList>
                    <IonItemDivider />
                    <IonList>
                        {preAddedUsers.map((user, key) => {
                            return <IonItem key={key}>
                                <IonIcon color="success" icon={personCircleOutline} />
                                {user.fullName}
                                <IonIcon
                                    icon={closeOutline}
                                    color="danger"
                                    onClick={this.deletePreAddedUser.bind(this, key)} />
                            </IonItem>
                        })}
                    </IonList>
                    <div className="e-footer-buttons">
                        <IonButton onClick={this.addUsersToLesson.bind(this)}>
                            <IonIcon icon={checkmarkOutline} />
                        </IonButton>
                        <IonButton color="danger" onClick={this.deleteLesson.bind(this, this.state.selectedEventData.id)}>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </div>
                </IonGrid>

            </>
        );
    }

    onFiltering = e => {
        let query = new Query();
        query = (e.text !== "") ? query.where("FullName", "contains", e.text, true) : query;
        e.updateData(this.userNames, query);
    };

    private async getAllLessons(): Promise<void> {
        var response = await axios.get("http://localhost:8080/lesson/all");
        console.log("getAllLessons", response);
        setTimeout(async () => this.setState({ lessons: response.data }), 200);
    }

    private addPreAddedUser(args: SelectEventArgs) {
        const { preAddedUsers } = this.state;

        // Change itemData to a new object with the right properties (FullName and User)
        var itemDataString = JSON.stringify(args.itemData);
        var user: string = JSON.parse(itemDataString).User;

        var properties: string[] = user.split(',');
        var newUser: IUser = {
            id: parseInt(properties[0]),
            fullName: properties[1],
            address: properties[2],
            phone: properties[3],
            email: properties[4],
        };

        this.setState({ preAddedUsers: [...preAddedUsers, newUser] });
    }

    private async addLesson(eventData: any): Promise<void> {
        const { lessons } = this.state;

        var addedLesson: ILesson = await axios.post("http://localhost:8080/lesson/save", {
            id: eventData.id || eventData.Id,
            subject: eventData.Subject || eventData.subject,
            startTime: eventData.startTime || eventData.StartTime,
            endTime: eventData.endTime || eventData.EndTime
        } as ILesson);

        lessons.concat([addedLesson]);
        this.setState({ lessons });
    }

    private async addUsersToLesson(): Promise<void> {
        const { selectedEventData, preAddedUsers } = this.state;
        selectedEventData.users = preAddedUsers;

        await axios.post("http://localhost:8080/lesson/save", selectedEventData);
        window.location.reload();
    }

    private deletePreAddedUser(index: number) {
        const { preAddedUsers } = this.state;
        preAddedUsers.splice(index, 1);
        this.setState({ preAddedUsers });
    }

    private async deleteLesson(id: number): Promise<void> {
        await axios.delete(`http://localhost:8080/lesson?id=${id}`);
        window.location.reload();
    }
}