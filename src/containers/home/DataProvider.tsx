import {
    IInterViewSettings,
    IJobDetails,
    IRequisitionDetails,
} from "@src/interface/forms";
import React, { createContext, useContext, useState, useReducer } from "react";

const initialValues = {
    requisitionDetails: {
        gender: "",
        noOfOpenings: 0,
        requisitionTitle: "",
        urgency: "",
    },
    jobDetails: {
        jobDetails: "",
        jobLocation: "",
        jobTitle: "",
    },
    interviewSettings: {
        interviewDuration: "",
        interviewLanguage: "",
        interviewMode: "",
    },
};

// Code for using context state
export enum DataActionTypes {
    REQUISITION_UPDATE = "REQUISITION_UPDATE",
    JOB_DETAILS_UPDATE = "JOB_DETAILS_UPDATE",
    INTERVIEW_SETTINGS_UPDATE = "INTERVIEW_SETTINGS_UPDATE",
}

export interface IDataAction {
    type: DataActionTypes;
    payload:
        | typeof initialValues["requisitionDetails"]
        | typeof initialValues["jobDetails"]
        | typeof initialValues["interviewSettings"];
}

const DataContext = createContext<{
    state: typeof initialValues;
    handleContextStateUpdate: (action: IDataAction) => void;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, setState] = useState(initialValues);

    const handleContextStateUpdate = (action: IDataAction) => {
        switch (action.type) {
            case DataActionTypes.REQUISITION_UPDATE:
                setState((prev) => ({
                    ...prev,
                    requisitionDetails: action.payload as IRequisitionDetails,
                }));
                return;
            case DataActionTypes.JOB_DETAILS_UPDATE:
                setState((prev) => ({
                    ...prev,
                    jobDetails: action.payload as IJobDetails,
                }));
                return;
            case DataActionTypes.INTERVIEW_SETTINGS_UPDATE:
                setState((prev) => ({
                    ...prev,
                    interviewSettings: action.payload as IInterViewSettings,
                }));
                return;
            default:
                break;
        }
    };

    return (
        <DataContext.Provider value={{ state, handleContextStateUpdate }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};

export default DataProvider;

export type StateType = typeof initialValues;
