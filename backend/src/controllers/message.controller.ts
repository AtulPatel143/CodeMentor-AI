import { asyncHandler } from "../middleware/asyncHandler";
import { AppError } from "../errors/AppError";
import { MessageService } from "../services/message.service";
import { initSSE, writeSSE, endSSE } from "../utils/sse";
const messageService = new MessageService();

/**
 * GET /api/conversations/:conversationId/messages
 */
export const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const messages = await messageService.getMessages(conversationId);

  res.status(200).json({
    success: true,
    data: messages,
  });
});

/**
 * POST /api/conversations/:conversationId/messages
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    throw new AppError("Message content is required.", 400);
  }

  const message = await messageService.sendMessage(conversationId, content);

  res.status(201).json({
    success: true,
    data: message,
  });
});

/**
 * POST /api/conversations/:conversationId/messages/stream
 */
export const streamMessage = async (req, res): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;

    if (!content?.trim()) {
      throw new AppError("Message content is required.", 400);
    }

    initSSE(res);

    writeSSE(res, "start", {});

    for await (const chunk of messageService.streamMessage(
      conversationId,
      content,
    )) {
      writeSSE(res, "token", { chunk });
    }

    writeSSE(res, "done", {});

    endSSE(res);
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Streaming failed.",
      });
      return;
    }

    writeSSE(res, "error", {
      message: error instanceof Error ? error.message : "Streaming failed.",
    });

    endSSE(res);
  }
};
