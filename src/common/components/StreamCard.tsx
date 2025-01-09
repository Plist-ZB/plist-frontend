import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

interface StreamCardProps {
  readonly item: {
    id: number;
    title: string;
    host: string;
    category: string;
    duration: string;
    participants: number;
  };
}

/* 
최근: 스트리밍 중인 전체 항목 100개를 다 줌

*/

export default function StreamCard({ item }: StreamCardProps) {
  return (
    <Card to={`/stream/${item.id}`}>
      <Thumbnail>
        <LiveBadge>
          <FaUserAlt size={8} />
          {item.participants}
        </LiveBadge>
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

const Card = styled(Link)`
  display: flex;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;

  &:hover {
    border: 1px solid var(--color-primary);
  }
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  display: flex;
  align-items: center;
  gap: 2px;
  color: var(--color-white);
  background-color: var(--color-red);
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 8px;
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

  b {
    color: var(--color-black);
  }
`;

const Info = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #555;
`;
