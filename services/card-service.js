const CardModel = require("../models/card-model");
const ApiError = require("../exceptions/api-error");

class CardService {
  async addCard(userData, title, words) {
    const card = await CardModel.create({
      user: userData.id,
      title,
      words,
    });
    return card;
  }
  async getCardsByUser(userData) {
    const userCards = await CardModel.find({ user: userData.id });
    return userCards;
  }
  async getCardById(cardId) {
    const userCard = await CardModel.findOne({ _id: cardId });
    console.log(userCard)
    return userCard;
  }
  async deleteWordInCard(cardId, wordId) {
    const userCard = await CardModel.find({_id: cardId})
    if (userCard[0].words.length === 1) {
      throw ApiError.BadRequest("Нельзя удалить последнее слово в карточке");
    }
    const updatedCard = await CardModel.updateOne(
      { _id: cardId },
      {
        $pull: { words: { _id: wordId } },
      }
    ); 
    return updatedCard;
  }
  async changeWordInCard(cardId, wordId, word, translation) {
    const updatedCard = await CardModel.findOneAndUpdate(
      { _id: cardId, "words._id": wordId },
      {
        $set: {
          'words.$.word': word, 
          'words.$.translation': translation,
        }
      },
    ); 
    return updatedCard;
  }
  async createNewWord(cardId, word, translation) {
    console.log(cardId, word, translation)
    const userCard = await CardModel.findByIdAndUpdate(
      { _id: cardId },
      { $push: { words: { word, translation }}},
      {new: true}
    )
    return userCard;
  }
  async changeCardTitle(cardId, title) {
    const userCard = await CardModel.findOneAndUpdate(
      { _id: cardId },
      { title }
    );
    return userCard.title;
  }
  async deleteCard(cardId) {
    const deletedCard = await CardModel.deleteOne({ _id: cardId });
    return deletedCard;
  }
}
module.exports = new CardService();
