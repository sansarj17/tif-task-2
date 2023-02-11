import {
    Container,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Heading,
    TabProps,
    Box,
    Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import { useData } from "./DataProvider";
import {
    IInterViewSettings,
    IJobDetails,
    IRequisitionDetails,
} from "@src/interface/forms";

import { StateType, IDataAction, DataActionTypes } from "./DataProvider";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
    return (
        <Tab p="1rem" fontFamily="Poppins" {...props}>
            {children}
        </Tab>
    );
};

const HomeLayout = () => {
    const [page, setPage] = useState<PageNumbers>(0);

    const handlePage = (pageNumber: PageNumbers) => {
        setPage(pageNumber);
    };

    const context = useData();

    // const [state, setState] = useState<StateType>({
    //     requisitionDetails: {
    //         gender: "",
    //         noOfOpenings: 0,
    //         requisitionTitle: "",
    //         urgency: "",
    //     },
    //     jobDetails: {
    //         jobDetails: "",
    //         jobLocation: "",
    //         jobTitle: "",
    //     },
    //     interviewSettings: {
    //         interviewDuration: "",
    //         interviewLanguage: "",
    //         interviewMode: "",
    //     },
    // });

    // We can use local state as well as context state because the component tree is small.
    // Not exposing context setState method to components
    // handleContextStateUpdate acts as a reducer for context

    const handleStateChange = React.useCallback(
        (
            valuesObj: IRequisitionDetails | IJobDetails | IInterViewSettings,
            changeType: "REQUISITION" | "JOB" | "INTERVIEW"
        ) => {
            switch (changeType) {
                case "REQUISITION":
                    context?.handleContextStateUpdate({
                        type: DataActionTypes.REQUISITION_UPDATE,
                        payload: valuesObj as IRequisitionDetails,
                    });
                    break;
                // return setState(prev => ({...prev,requisitionDetails:valuesObj as IRequisitionDetails}))
                case "JOB":
                    context?.handleContextStateUpdate({
                        type: DataActionTypes.JOB_DETAILS_UPDATE,
                        payload: valuesObj as IJobDetails,
                    });
                    break;
                // return setState(prev => ({...prev,jobDetails:valuesObj as IJobDetails}))

                case "INTERVIEW":
                    context?.handleContextStateUpdate({
                        type: DataActionTypes.INTERVIEW_SETTINGS_UPDATE,
                        payload: valuesObj as IInterViewSettings,
                    });
                    break;
                // return setState(prev => ({...prev,interviewSettings:valuesObj as IInterViewSettings}))
                default:
                    break;
            }
        },
        []
    );

    // console.log("HomeLayout Rendered");

    return (
        <Box w="100%">
            <Container maxW="1200px">
                <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
                    Create Candidate Requisition
                </Heading>
                <Tabs index={page} isLazy lazyBehavior="keepMounted">
                    <TabList>
                        <CustomTab>Requistion Details</CustomTab>
                        <CustomTab>Job Details</CustomTab>
                        <CustomTab>Interview Settings</CustomTab>
                    </TabList>
                    <Grid
                        display="grid"
                        gridTemplateColumns="3fr 2fr"
                        gap="24px"
                    >
                        <TabPanels>
                            <TabPanel>
                                <RequisitionForm
                                    handleRequisitionDetailsChange={(
                                        values: IRequisitionDetails
                                    ) =>
                                        handleStateChange(values, "REQUISITION")
                                    }
                                    handleTab={handlePage}
                                />
                            </TabPanel>
                            <TabPanel>
                                <JobDetailsForm
                                    handleJobDetailsChange={(
                                        values: IJobDetails
                                    ) => handleStateChange(values, "JOB")}
                                    handleTab={handlePage}
                                />
                            </TabPanel>
                            <TabPanel>
                                <InterviewSettingsForm
                                    handleInterviewSettingsChange={(
                                        values: IInterViewSettings
                                    ) => handleStateChange(values, "INTERVIEW")}
                                    handleTab={handlePage}
                                />
                            </TabPanel>
                        </TabPanels>
                        <DisplayCard
                            requisitionDetails={
                                context?.state.requisitionDetails
                            }
                            jobDetails={context?.state.jobDetails}
                            interviewSettings={context?.state.interviewSettings}
                        />
                    </Grid>
                </Tabs>
            </Container>
        </Box>
    );
};

export default HomeLayout;
