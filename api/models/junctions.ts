interface ServerChannelAttributes {
    id: string;
    server_id: string;
    channel_id: string;
  }
  
  class ServerChannel implements ServerChannelAttributes {
    id: string;
    server_id: string;
    channel_id: string;
  
    constructor(_server_id: string, _channel_id: string) {
      this.id = crypto.randomUUID();
      this.server_id = _server_id;
      this.channel_id = _channel_id;
    }
  }
  
  interface ServerUserAttributes {
    id: string;
    server_id: string;
    user_id: string;
  }
  
  class ServerUser implements ServerUserAttributes {
    id: string;
    server_id: string;
    user_id: string;
  
    constructor(_server_id: string, _user_id: string) {
      this.id = crypto.randomUUID();
      this.server_id = _server_id;
      this.user_id = _user_id;
    }
  }
  
  interface ChannelPostAttributes {
    id: string;
    channel_id: string;
    post_id: string;
  }
  
  class ChannelPost implements ChannelPostAttributes {
    id: string;
    channel_id: string;
    post_id: string;
  
    constructor(_channel_id: string, _post_id: string) {
      this.id = crypto.randomUUID();
      this.channel_id = _channel_id;
      this.post_id = _post_id;
    }
  }
  
  interface UserPostAttributes {
    id: string;
    user_id: string;
    post_id: string;
  }
  
  class UserPost implements UserPostAttributes {
    id: string;
    user_id: string;
    post_id: string;
  
    constructor(_user_id: string, _post_id: string) {
      this.id = crypto.randomUUID();
      this.user_id = _user_id;
      this.post_id = _post_id;
    }
  }

  export {ServerChannel, ServerUser, ChannelPost, UserPost}