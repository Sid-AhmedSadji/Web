class PrivateMessage {
    constructor(id, senderId, receiverId, text, timestamp) {
      this.id = id;
      this.senderId = senderId;
      this.receiverId = receiverId;
      this.text = text;
      this.timestamp = timestamp;
    }
  }
  
  module.exports = PrivateMessage;