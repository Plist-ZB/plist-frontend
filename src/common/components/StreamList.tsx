import React from "react";
import styled from "styled-components";

export default function StreamList() {
  return (
    <StreamListContainer>
      {streams.map((stream, index) => (
        <StreamCard key={index}>
          <Thumbnail>
            <LiveBadge>Live</LiveBadge>
            썸네일
          </Thumbnail>
          <StreamDetails>
            <Title>
              <b>{stream.title}</b>
            </Title>
            <Info>{stream.host}</Info>
            <Info>카테고리: {stream.category}</Info>
            <Info>스트리밍 시간: {stream.duration}</Info>
          </StreamDetails>
        </StreamCard>
      ))}
    </StreamListContainer>
  );
}

// 채널 리스트
const streams = [
  {
    title: "발라드 추천 좀 해주세요~",
    host: "노지훈",
    category: "발라드, 가을",
    duration: "1시간 27분",
  },
  {
    title: "데이식스 전곡 듣기",
    host: "송유나",
    category: "밴드",
    duration: "1시간 27분",
  },
];

const StreamListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
`;

const StreamCard = styled.div`
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
