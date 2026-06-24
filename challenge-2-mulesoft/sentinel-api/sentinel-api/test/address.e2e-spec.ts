import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { createTestApp } from './test-utils';

describe('Address API (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await createTestApp();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  const headers = { 'x-api-key': 'test' };

  // ─── Authentication ────────────────────────────────────────────────────────

  describe('Authentication', () => {
    it('GET /addresses without API key returns 401', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses?organisationId=1742',
      });
      expect(res.statusCode).toBe(401);
    });

    it('GET /addresses with wrong API key returns 401', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses?organisationId=1742',
        headers: { 'x-api-key': 'wrong-key' },
      });
      expect(res.statusCode).toBe(401);
    });

    it('GET /addresses with valid API key returns 200', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses?organisationId=1742',
        headers,
      });
      expect(res.statusCode).toBe(200);
    });
  });

  // ─── Health ────────────────────────────────────────────────────────────────

  describe('GET /health', () => {
    it('returns 200 with database status', async () => {
      const res = await app.inject({ method: 'GET', url: '/health' });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('timestamp');
    });
  });

  // ─── GET /addresses ────────────────────────────────────────────────────────

  describe('GET /addresses', () => {
    it('returns addresses by organisationId (default route)', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses?organisationId=1742',
        headers,
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0]).toHaveProperty('addressId');
      expect(body[0]).toHaveProperty('organisationId');
    });

    it('returns addresses by applicationRefNumber', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses?applicationRefNumber=APP-2024-001',
        headers,
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
    });

    it('returns CFS addresses when isCfs=true', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses?isCfs=true&applicationRefNumber=CFS-2024-001&cfsApplicationAddressType=CFS_BILLING',
        headers,
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it('returns empty array when no results found', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses?applicationRefNumber=NONEXISTENT-9999',
        headers,
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body).toEqual([]);
    });
  });

  // ─── GET /addresses/:addressId ─────────────────────────────────────────────

  describe('GET /addresses/:addressId', () => {
    it('returns a single address for valid ID', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses/1664',
        headers,
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body).toHaveProperty('addressId');
      expect(body.addressId).toBe(1664);
    });

    it('returns 404 for non-existent address ID', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/addresses/999999',
        headers,
      });
      expect(res.statusCode).toBe(404);
    });
  });

  // ─── POST /addresses ───────────────────────────────────────────────────────

  describe('POST /addresses', () => {
    it('creates a new address and returns success', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/addresses',
        headers: { ...headers, 'content-type': 'application/json' },
        payload: {
          organisationId: 1742,
          addressLine1: '99 Test Street',
          city: 'London',
          postcode: 'EC1A 1BB',
          country: 'United Kingdom',
          addressTypeCode: 'REG',
          isActive: true,
        },
      });
      expect(res.statusCode).toBe(201);
    });

    it('returns 400 for missing required fields', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/addresses',
        headers: { ...headers, 'content-type': 'application/json' },
        payload: {
          organisationId: 1742,
          // missing addressLine1, city, postcode, etc.
        },
      });
      expect(res.statusCode).toBe(400);
    });
  });

  // ─── PUT /addresses/:addressId ─────────────────────────────────────────────

  describe('PUT /addresses/:addressId', () => {
    it('updates an address and returns success', async () => {
      const res = await app.inject({
        method: 'PUT',
        url: '/addresses/1664',
        headers: { ...headers, 'content-type': 'application/json' },
        payload: {
          city: 'Updated City',
        },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  // ─── DELETE /addresses ─────────────────────────────────────────────────────

  describe('DELETE /addresses', () => {
    it('deletes addresses and returns confirmation', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/addresses',
        headers: { ...headers, 'content-type': 'application/json' },
        payload: {
          addressIds: [2041, 2042],
        },
      });
      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body).toHaveProperty('deleted');
      expect(body).toHaveProperty('addressIds');
    });
  });
});
