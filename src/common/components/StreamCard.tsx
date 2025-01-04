import styled from "styled-components";

interface StreamCardProps {
  readonly item: {
    title: string;
    host: string;
    category: string;
    duration: string;
  };
  readonly onClick: () => void;
}

export default function StreamCard({ item, onClick }: StreamCardProps) {
  return (
    <Card onClick={onClick}>
      <Thumbnail>
        <LiveBadge>Live</LiveBadge>
        썸네일
      </Thumbnail>
      <StreamDetails>
        <Title>
          <b>{item.title}</b>
        </Title>
        <Info>{item.host}</Info>
        <Info>카테고리: {item.category}</Info>
        <Info>스트리밍 시간: {item.duration}</Info>
      </StreamDetails>
    </Card>
  );
}

const Card = styled.button`
  display: flex;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background: red;
  color: white;
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  color: black;
`;

const StreamDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const Info = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #555;
`;
