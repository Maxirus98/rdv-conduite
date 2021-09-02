import { Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek } from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import React from "react";
import { Lessons } from "../modals/Lessons";

interface ICalendarState {
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
        return (
            <>
                <ScheduleComponent editorTemplate={this.getEditorTemplate.bind(this)}
                    enableAllDayScroll={true}
                    showWeekend={false}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
            </>
        );
    }

    private getEditorTemplate(props: any): JSX.Element {
        return (
            <table>
                <tbody>
                    <tr>
                        <td className="e-textLabel">Module/Sortie</td>
                        <td>
                            <DropDownListComponent
                                id="lessons"
                                className="e-field e-input"
                                data-name="Subject"
                                dataSource={Object.keys(Lessons)}
                                placeholder="Module/Sortie"
                                value={props.Title || null}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">From</td>
                        <td><DateTimePickerComponent className="e-field" id="StartTime" data-name="StartTime"
                            value={new Date(props.startTime || props.StartTime)}>
                        </DateTimePickerComponent></td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">To</td>
                        <td>
                            <DateTimePickerComponent className="e-field" id="EndTime" data-name="EndTime"
                                value={new Date(props.endTime || props.StartTime)}>
                            </DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>

            </table>
        );
    }
}