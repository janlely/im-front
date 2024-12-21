"use client"
import React, { Suspense } from 'react';
import Grid from '@mui/material/Grid2';
import { List, ListItem, Button, Drawer, Stack, Box, Typography, Paper, Avatar, TextField, CircularProgress } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import OutputIcon from '@mui/icons-material/Output';
import PhotoIcon from '@mui/icons-material/Photo';
import {Memeber, MessageDivData, MessageType} from "@/types/message"
import { styled } from '@mui/material/styles';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from 'axios';
import { generateThumbnail, uploadImages } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import MyImage from '@/components/myimage';
import { Emoji } from '@/types/message';


function Chat() {
  const [members, setMembers] = React.useState<Memeber[]>([]);
  const [inputText, setInputText] = React.useState("");
  const connectionInited = React.useRef(false)
  const msgBodyRef = React.useRef<HTMLDivElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [scrollToBottomNeeded, setScrollToBottomNeeded] = React.useState(false);
  const messagesRef = React.useRef<MessageDivData[]>([])
  const [messages, setMessages] = React.useState<MessageDivData[]>([]);
  const [memberListOpen, setMemberListOpen] = React.useState(false);
  const [emojiShow, setEmojiShow] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = encodeURIComponent(searchParams.get("roomId")!)

  React.useEffect(() => {
    messagesRef.current = messages
    if (scrollToBottomNeeded) {
        setScrollToBottomNeeded(false)
        scrollToBottom(msgBodyRef.current!)
    }
    console.log(`message size: ${messages.length}, div size: ${msgBodyRef.current?.childElementCount}`)
  }, [messages, scrollToBottomNeeded])

  const toggleMemberList = () =>  {
    setMemberListOpen(!memberListOpen);
  }

  const toggleEmojiPicker = () =>  {
    setEmojiShow(!emojiShow);
  }

  const memgerList = () => {
    return (
        <List>
            {members.map((member) => (
                <ListItem key={member.username}>{member.username}</ListItem>
            ))}
        </List>
    )
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#afcaa7',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    maxWidth: '70vw',
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  const refreshMembers = () => {
    axios.get("/api/chat/members", {
        headers: {
            "RoomId": roomId
        }
    }).then(res => {
        setMembers(uniqueByProperty(res.data, item => item.username))
    })
  }
  function uniqueByProperty<T, K extends keyof T>(items: T[], propGetter: (item: T) => T[K]): T[] {
    const seen = new Set<T[K]>();
    return items.filter(item => {
      const propValue = propGetter(item);
      if (seen.has(propValue)) {
        return false;
      } else {
        seen.add(propValue);
        return true;
      }
    });
  }
  const connect = () => {
    const wsClient = new WebSocket(`/chat-ws?${roomId}`);
  
    wsClient.onopen = () => {
      console.log("WebSocket connected");
      refreshMembers()
    };
  
    wsClient.onclose = (e) => {
      console.log(`WebSocket disconnected, code: ${e.code}`);
      if (e.code === 3401) {
        if (typeof window != undefined) {
          router.push("/login")
        }
      } else {
        setTimeout(connect, 1000);
      }
    };
  
    wsClient.onmessage = (e) => {
      if (e.data === "notify") {
        console.log("Received notification, pulling messages...");
        pullMessage("after");
      } else if (e.data === "members") {
        refreshMembers()
      } else if (e.data === "pong") {
        console.log("Received pong");
      }
    };
    return wsClient
  }

  React.useEffect(() => {

    if (connectionInited.current) {
        return
    }
    console.log("should execute once")
    const wsClient = connect()
    connectionInited.current = true
    pullMessage("before")
    return () => {
        console.log("关闭连接")
        wsClient.close()
    }
  })
  const findLastUuid = (msgs: MessageDivData[]) => {
    for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].message.sender !== "me") {
            return msgs[i].uuid
        }
    }
    return 0
  }
  const pullMessage = (direction: string) => {
    const isAtBottom = isScrollbarAtBottom(msgBodyRef.current!)
    const uuid = direction === "before" ?
        (messagesRef.current[0]?.uuid ?? 0) :
        findLastUuid(messagesRef.current)
    axios.post("/api/chat/pull", {
        uuid: uuid,
        direction: direction
    }, {
        headers: {
            "RoomId": roomId
        }
    }).then(res => {
        const receivedMessages = res.data as MessageDivData[]
        setMessages(
            direction == "before" ? [...receivedMessages, ...messagesRef.current] : [...messagesRef.current, ...receivedMessages]
        )
        if (isAtBottom) {
            console.log("need to set scroll to bottom")
            setScrollToBottomNeeded(true)
        }
    })
  }
  const isScrollbarAtBottom = (element: HTMLDivElement) => {
      return element.scrollTop + element.clientHeight >= element.scrollHeight;
  }
  const scrollToBottom = (element: HTMLDivElement) => {
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
  const handleSendBtnClick = () => {
    if (!inputText || inputText === "") {
      console.log("empty message")
      return
    }
    const message: MessageDivData = {
        message: {
            messageId: Date.now(),
            type: MessageType.TEXT,
            data: inputText,
            sender: "me"
        },
        send: true,
        success: false,
        uuid: 0,
        failed: false
    }
    setInputText("")
    setMessages(prevMessages => [...prevMessages, message])
    sendMessage(message, (msg, uuid) => ({ ...msg, success: true, uuid: uuid}))
  }

  const sendMessage = (message: MessageDivData, sprend: (msg: MessageDivData, uuid: number) => MessageDivData) => {
    axios.post("/api/chat/send", message.message, {
        headers: {
            "RoomId": roomId
        }
    }).then(res => {
        console.log(`response status: ${res.status}`)
        if (res.status === 401) {
          if (typeof window !== undefined) {
            window.location.href = "/Login"
            return
          }
        }
        setMessages(prevMessages =>
            uniqueByProperty(prevMessages.map(msg =>
                msg.message.messageId === message.message.messageId
                    ? sprend(msg, res.data.uuid) 
                    : msg
            ), item => item.uuid)
        );
        setScrollToBottomNeeded(true)
    })
  }

  const uploadImgThenSend = (blob: Blob, thumbnailBlob: Blob) => {
      const message: MessageDivData = {
          message: {
              messageId: Date.now(),
              type: MessageType.IMAGE,
              data: JSON.stringify({thumbnail: URL.createObjectURL(thumbnailBlob), url: ""}),
              sender: "me"
          },
          send: true,
          success: false,
          uuid: 0,
          failed: false,
          blob: blob
      }
      //更新消息面板
      setMessages(uniqueByProperty([...messagesRef.current, message], item => item.uuid))
      setScrollToBottomNeeded(true)
      //上传图片
      uploadImages(thumbnailBlob, blob).then(urls => {
        const data = JSON.stringify({thumbnail: urls[0], url: urls[1]})
        sendMessage({...message, message: {...message.message, data: data}},
          (msg, uuid) => ({...msg, success: true, uuid: uuid, message: {...message.message, data: data}}))
      }) 
  }

  const sendImgMessage = (blob: Blob) => {  
    if (!blob) {
        return
    }
    generateThumbnail(blob, 100, 100).then(thumbnailBlob => {
      uploadImgThenSend(blob, thumbnailBlob)
    }).catch(err => {
      console.log("error create thumbnail", err)
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files![0]; // 获取File对象
    if (file) {
      sendImgMessage(file)
    }
  }

  const emojiSelected = (emoji: Emoji) => {
    setInputText(inputText + emoji.native)
  }

  return (
    <Stack spacing={2} sx={{ height: "100vh", width: '100vw', paddingBottom: '2vh'}}>
      {/* header */}
      <Grid container spacing={2} sx={{height: "10vh", alignItems: "center"}}>
        <Grid size={4}>
          <Button onClick={toggleMemberList}><GroupIcon /></Button>
          <Drawer
            anchor={"left"}
            open={memberListOpen}
            onClose={toggleMemberList}
          >
            {memgerList()}
          </Drawer>
        </Grid>
        <Grid size={4} sx={{ textAlign: "center", alignContent: "center" }}>
          {decodeURIComponent(roomId)}
        </Grid>
        <Grid size={4} sx={{ textAlign: "right" }}>
          <Button onClick={() => { router.push("/") }}><OutputIcon /></Button>
        </Grid>
      </Grid>

      {/* message body */}
      <Box ref={msgBodyRef} sx={{ flexGrow: 1, overflowX: 'hidden', overflowY: 'auto', px: 3, height: "80vh"}} >
        {messages.map((msg) => (
          msg.send ?
            <Box key={msg.message.messageId} sx={{ display: "flex", justifyContent: 'flex-end', width: "100vw", pr: '50px' }}>
              <Item sx={{ my: 1, p: 2 }}>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  {!msg.success && (msg.failed ? <Button><ReplayIcon/></Button> : <Button><CircularProgress /></Button>)}
                  {msg.message.type === MessageType.TEXT ?
                    <Typography variant="body1" gutterBottom>{msg.message.data}</Typography> :
                    <MyImage
                      thumbnailUrl={JSON.parse(msg.message.data).thumbnail}
                      originalUrl={JSON.parse(msg.message.data).url}
                    />
                  }
                  <Avatar>{msg.message.sender.substring(0, 3)}</Avatar>
                </Stack>
              </Item>
            </Box>
            :
            <Box key={msg.message.messageId} sx={{ display: "flex", justifyContent: 'flex-start', width: "100vw", pr: '50px' }}>
              <Item sx={{ my: 1, p: 2 }}>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                  <Avatar>{msg.message.sender.substring(0, 3)}</Avatar>
                  {msg.message.type === MessageType.TEXT ?
                    <Typography variant='body1' gutterBottom>{msg.message.data}</Typography> :
                    <MyImage
                      thumbnailUrl={JSON.parse(msg.message.data).thumbnail}
                      originalUrl={JSON.parse(msg.message.data).url}
                    />
                  }
                </Stack>
              </Item>
            </Box>
        ))}
      </Box>
      {/* message input */}
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-start', px: '5vw' }}>
        <Box>
          <InsertEmoticonIcon onClick={toggleEmojiPicker}/>
          {emojiShow &&
            <Box sx={{ position: "absolute", zIndex: 2, bottom: '10vh', left: 0, paddingLeft: '2vw' }}>
              <Picker data={data} onEmojiSelect={emojiSelected} />
            </Box>
          }
        </Box>
        <Box sx={{width: '70vw'}}>
          <TextField id="outlined-basic" value={inputText} onChange={(e) => {setInputText(e.target.value)}} size='small' sx={{width: '100%'}} />
        </Box>
        <Box>
          <input
            type="file"
            accept="image/*"
            // capture="environment"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }} // 隐藏原始input
          />
          <Button variant="outlined" onClick={() => {fileInputRef.current?.click()}}  sx={{ px: '6px', minWidth: '40px'}} ><PhotoIcon /></Button>
        </Box>
        <Box>
          <Button variant="contained" onClick={handleSendBtnClick}>发送</Button>
        </Box>
      </Stack>
    </Stack>
  );
}



export default function ChatPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chat/>
    </Suspense>
  );
}