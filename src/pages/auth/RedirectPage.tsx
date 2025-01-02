import LogoIcon from "@/assets/logo.png";
import { ScaleLoader } from "react-spinners";

export default function RedirectPage() {
  return <div>RedirectPage</div>;
  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoIcon} alt="Logo" />
        <LogoText>PLIST</LogoText>
      </LogoWrapper>
      <Spinners>
        <ScaleLoader
          color="#4654A3"
          height={40}
          margin={2}
          radius={0}
          speedMultiplier={0.7}
          width={6}
        />
      </Spinners>
    </Container>
  );
}
