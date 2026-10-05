"""
Intent Service — Custom Model Wrapper
=======================================
Wraps the trained intent classifier to match the existing
IntentClassificationModule API signature.

Replaces LLM-based intent classification entirely.
"""

from typing import Tuple
from app.core.logger import logger
from app.ml_models.intent_classifier.model import intent_classifier


class IntentService:
    """
    Service layer wrapping the custom intent classifier.
    Returns the same (intent, confidence, complexity, needs_clarification)
    tuple expected by the LangGraph workflow.
    """

    async def classify(
        self,
        query: str,
        conversation_history: list = None,
        domain: str = "general",
    ) -> Tuple[str, float, str, bool]:
        """
        Classify user intent using the custom trained model.

        Returns:
            Tuple of (workflow_intent, confidence, complexity, needs_clarification)
        """
        clean_q = query.lower().strip().strip("!").strip(".").strip('"').strip("'")
        
        # 1. Exact Match Greetings
        greetings = {
            "hi", "hello", "hey", "hey there", "good morning", "good afternoon", 
            "good evening", "howdy", "greetings", "sup", "sup?", "yo", "bye", 
            "goodbye", "see ya", "talk to you later", "wake up", "hello bot"
        }
        
        # 2. Broad Conversational & Off-Topic Phrases (Catches all 6 of your categories)
        conversational_phrases = [
            "how are you", "who are you", "what is your name", "are you a human", 
            "are you a robot", "are you an ai", "who made you", "creator", 
            "chatgpt", "gemini", "company built you", "how old are you", 
            "where do you live", "physical body", "what is insightos", 
            "boss", "self-aware", "how is your day", "feeling sad", "happy", 
            "sleep well", "eat today", "coffee", "bored", "joke", "laugh", 
            "hobbies", "for fun", "friends", "awesome", "thank you", "thanks",
            "what can you do", "how can you help", "python code", "write sql", 
            "delete my database", "predict the future", "make mistakes", 
            "internet access", "how fast are you", "teach me", "languages do you speak", 
            "why should i use you", "save me money", "main objective", 
            "tableau", "powerbi", "replace my data analyst", "pep talk", 
            "give me advice", "ready for work", "make some money today", 
            "capital of france", "recipe", "cricket", "poem", "car engine", 
            "meaning of life", "ignore all previous", "terrible ai", "shut down", 
            "quantum physics", "scrape a website", "translate", "weather", 
            "dragon", "hack a website"
        ]
        
        # STRICT BYPASS: If the query matches greetings or contains any phrase from our massive list, force OFF_TOPIC immediately.
        if clean_q in greetings or any(phrase in clean_q for phrase in conversational_phrases):
            logger.info(f"[IntentService] Strict conversational bypass triggered for: '{query}' -> OFF_TOPIC")
            # Set needs_clarification to False so it goes straight to our off_topic node without getting stuck
            return ("OFF_TOPIC", 1.0, "Simple", False)

        # Use the custom model
        retail_intent, confidence, workflow_intent = intent_classifier.predict(query)

        # Determine complexity based on query length and keywords
        complexity = self._estimate_complexity(query)

        # Determine if clarification is needed (Only trigger for truly unknown queries)
        needs_clarification = (workflow_intent == "UNKNOWN")

        logger.info(
            f"[IntentService] Custom model result: "
            f"retail={retail_intent}, workflow={workflow_intent}, "
            f"conf={confidence:.3f}, complexity={complexity}, "
            f"clarify={needs_clarification}"
        )

        return (workflow_intent, confidence, complexity, needs_clarification)

    def _estimate_complexity(self, query: str) -> str:
        """Estimate query complexity from text characteristics."""
        words = query.split()
        query_lower = query.lower()

        # Complex indicators
        complex_kw = ["compare", "trend", "correlation", "forecast",
                      "predict", "over time", "year over year",
                      "breakdown", "cross-reference", "and also"]
        if len(words) > 15 or any(kw in query_lower for kw in complex_kw):
            return "Complex"

        # Medium indicators
        medium_kw = ["by category", "by channel", "group by",
                     "filter", "between", "last month", "this week"]
        if len(words) > 8 or any(kw in query_lower for kw in medium_kw):
            return "Medium"

        return "Simple"

    def get_retail_intent(self, query: str) -> str:
        """Get the retail-specific intent label (not workflow label)."""
        retail_intent, _, _ = intent_classifier.predict(query)
        return retail_intent


# Singleton
intent_service = IntentService()