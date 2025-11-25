import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import UserContextProvider from './Contexts/UserContextProvider'
import AppointmentContextProvider from './Contexts/AppointmentContextProvider'
import PlanContextProvider from './Contexts/PlanContextProvider'
import CustomerContextProvider from './Contexts/CustomerContextProvider'
import TransactionContextProvider from './Contexts/TransactionContextProvider'
import RegistrationContextProvider from './Contexts/RegistrationContextProvider'
import OfficeContextProvider from './Contexts/OfficeContextProvider'
import ResidentContextProvider from './Contexts/ResidentialContextProvider'
import ProfessionContextProvider from './Contexts/ProfessionContextProvider'
import SchoolContextProvider from './Contexts/SchoolContextProvider'
import TrainingContextProvider from './Contexts/TrainingContextProvider'
import IdentificationContextProvider from './Contexts/IdentificationContextProvider'
import NextContextProvider from './Contexts/NextContextProvider'
import ServiceContextProvider from './Contexts/ServiceContextProvider'
import DedicatedVirtualAccountContextProvider from './Contexts/DedicatedVirtualAccountContextProvider'
import ReportingContextProvider from './Contexts/ReportingContextProvider'
import JobContextProvider from './Contexts/JobContextProvider'
import ElectricityContextProvider from './Contexts/ElectricityContextProvider'
import InterswitchContextProvider from './Contexts/InterswitchContextProvider'
import ExternalClientContextProvider from './Contexts/ExternalClientContextProvider'
import FarmContextProvider from './Contexts/FarmContextProvider'
import { Toaster } from 'react-hot-toast';
import LecturerContextProvider from './Contexts/LecturerContextProvider'
import CourseContextProvider from './Contexts/CourseContextProvider'
import LibraryContextProvider from './Contexts/LibraryContextProvider'
import PaymentContextProvider from './Contexts/PaymentContextProvider'
import StackNavigation from "./Navigation/StackNavigation";
import TerminalContextProvider from "./Contexts/TerminalContextProvider";

function App() {
  

  return (
    <>
      <Toaster />
    <UserContextProvider>
      <FarmContextProvider>
        <ExternalClientContextProvider>
          <InterswitchContextProvider>
            <DedicatedVirtualAccountContextProvider>
              <PlanContextProvider>
                <CustomerContextProvider>
                  <TransactionContextProvider>
                    <RegistrationContextProvider>
                      <OfficeContextProvider>
                        <ResidentContextProvider>
                          <ProfessionContextProvider>
                            <SchoolContextProvider>
                              <TrainingContextProvider>
                                <IdentificationContextProvider>
                                  <AppointmentContextProvider>
                                    <NextContextProvider>
                                      <ServiceContextProvider>
                                        <ReportingContextProvider>
                                          <JobContextProvider>
                                            <ElectricityContextProvider>
                                              <CourseContextProvider>
                                                <LibraryContextProvider>
                                                <LecturerContextProvider>
                                                  <PaymentContextProvider> 
                                                    <TerminalContextProvider>
                                                      <StackNavigation />
                                                    </TerminalContextProvider>
                                                  </PaymentContextProvider>
                                                </LecturerContextProvider>
                                                </LibraryContextProvider>
                                              </CourseContextProvider>
                                            </ElectricityContextProvider>
                                          </JobContextProvider>
                                        </ReportingContextProvider>
                                      </ServiceContextProvider>
                                    </NextContextProvider>
                                  </AppointmentContextProvider>
                                </IdentificationContextProvider>
                              </TrainingContextProvider>
                            </SchoolContextProvider>
                          </ProfessionContextProvider>
                        </ResidentContextProvider>
                      </OfficeContextProvider>
                    </RegistrationContextProvider>
                  </TransactionContextProvider>         
                </CustomerContextProvider>
              </PlanContextProvider>
            </DedicatedVirtualAccountContextProvider>
          </InterswitchContextProvider>
        </ExternalClientContextProvider>
      </FarmContextProvider>
    </UserContextProvider>
    </>
  )
}

export default App
