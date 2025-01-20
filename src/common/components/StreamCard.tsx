import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import useEnterChannel from "@/common/hooks/useEnterChannel";

interface ExtendedChannel extends IChannel {
  channelParticipantCount: number; // 또는 적절한 타입
  channelStreamingTime: string; // 또는 적절한 타입
}

interface StreamCardProps {
  readonly item: ExtendedChannel;
}

export default function StreamCard({ item }: StreamCardProps) {
  const navigate = useNavigate();
  const enterChannelMutation = useEnterChannel();

  return (
    <Card
      onClick={() => {
        enterChannelMutation.mutate(item.channelId);
        navigate(`/channel/${item.channelId}`);
      }}
    >
      <Thumbnail $thumbnailUrl={item.channelThumbnail} className="flex-shrink-0">
        <LiveBadge>
          <FaUserAlt size={8} className="mb-[1px]" />
          {item.channelParticipantCount}
        </LiveBadge>
      </Thumbnail>
      <StreamDetails>
        <Title>
          <b>{item.channelName}</b>
        </Title>
        <Info>{item.channelHost}</Info>
        <Info>카테고리: {item.channelCategoryName}</Info>
        <Info>스트리밍 시간: {item.channelStreamingTime}</Info>
      </StreamDetails>
    </Card>
  );
}

const Card = styled.button`
  width: 100%;
  display: flex;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 11px;

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
  padding: 2px 6px;
  border-radius: 8px;
`;

const Thumbnail = styled.div<{ $thumbnailUrl: string }>`
  position: relative;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.$thumbnailUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  color: black;
  border: 1px solid var(--color-gray-border);
`;

const StreamDetails = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  color: var(--color-black);
`;

const Title = styled.h3`
  font-size: 16px;

  b {
    color: var(--color-black);
  }
`;

const Info = styled.p`
  font-size: 13px;
  color: var(--color-black);
  margin: 0;

  &:nth-of-type(1) {
    font-size: 15px;
    font-weight: 500;
  }

  &:nth-of-type(2) {
    font-size: 13px;
    color: #555;
  }

  &:nth-of-type(3) {
    font-size: 12px;
    color: #777;
  }
`;
