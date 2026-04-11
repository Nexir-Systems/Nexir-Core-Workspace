import type { EntityWritePayload } from '../models/entity.model';

/**
 * Realistic mock values for “Generate sample data” — coherent, editable, never auto-saved.
 */
export function getSampleEntityPayload(): EntityWritePayload {
  return {
    name: 'Quarterly alignment review',
    description:
      'Standing item to track cross-team alignment checkpoints. Owner updates status before each review window.',
    status: 'draft',
    category: 'operations',
    priority: 'medium',
    owner: 'Alex Morgan',
  };
}
