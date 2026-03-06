import HeaderLayout from "../../layout/HeaderLayout";
import DebyezTitle from "../app-components/title-logo/DebyezTitle";

interface AppHeaderProps {
    tools: React.ReactNode
}

const AppHeader = ({ tools }: AppHeaderProps) => {
    return (
        <HeaderLayout>
                <DebyezTitle textColor="gray-900" />
                {tools}
        </HeaderLayout>
    );
};

export default AppHeader;